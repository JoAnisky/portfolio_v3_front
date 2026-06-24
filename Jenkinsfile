pipeline {
    agent none

    environment {
        APP_NAME = "portfoliov3-front"
        DOCKER_IMAGE = "joanisky/portfoliov3-front"
        DOCKER_TAG = "${BUILD_NUMBER}"
        KUBE_NAMESPACE = "portfoliov3-front"
        KUBE_DEPLOYMENT = "nuxt-front"
    }

    stages {
        stage('Checkout') {
            agent any
            steps {
                checkout scm
                script {
                    env.GIT_BRANCH_NAME = env.GIT_BRANCH ?: scm.branches[0].name
                    echo "Build: ${BUILD_NUMBER} — Branche: ${env.GIT_BRANCH_NAME}"
                }
            }
        }
        stage('Build & Push Docker Image') {
            agent any
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'jenkins-dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')
                ]) {
                    sh '''
                        docker login -u $DOCKER_USER -p $DOCKER_PASS

                        docker build \
                            -f .docker/Dockerfile \
                            --target prod \
                            -t ${DOCKER_IMAGE}:${DOCKER_TAG} .

                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}

                        docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                        docker push ${DOCKER_IMAGE}:latest
                    '''
                }
            }
        }
        stage('Deploy Secrets') {
            agent any
            when { expression { env.GIT_BRANCH == 'origin/main' } }
            steps {
                withCredentials([
                    file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_FILE'),
                    string(credentialsId: 'portfoliov3-nuxt-api-base-url', variable: 'NUXT_API_BASE_URL')
                ]) {
                    sh '''
                        export KUBECONFIG=$KUBECONFIG_FILE

                        kubectl create namespace ${KUBE_NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -

                        kubectl create secret generic nuxt-env \
                            --from-literal=NUXT_API_BASE_URL=${NUXT_API_BASE_URL} \
                            -n ${KUBE_NAMESPACE} \
                            --dry-run=client -o yaml | kubectl apply -f -
                    '''
                }
            }
        }
        stage('Deploy to Kubernetes') {
            agent any
            when {
                expression { env.GIT_BRANCH == 'origin/main' }
            }
            steps {
                script {
                    withCredentials([
                        file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_FILE')
                    ]) {
                        sh '''
                            export KUBECONFIG=$KUBECONFIG_FILE

                            echo "Application des manifests Kubernetes..."
                            kubectl apply -k k8s/ -n ${KUBE_NAMESPACE}

                            echo "Mise a jour de l image vers: ${DOCKER_TAG}"
                            kubectl set image deployment/${KUBE_DEPLOYMENT} \
                                app=${DOCKER_IMAGE}:${DOCKER_TAG} \
                                -n ${KUBE_NAMESPACE}

                            echo "Attente du rollout..."
                            kubectl rollout status deployment/${KUBE_DEPLOYMENT} \
                                -n ${KUBE_NAMESPACE} \
                                --timeout=300s
                        '''
                    }
                }
            }
        }
        stage('Verify Deployment') {
            agent any
            when {
                expression { env.GIT_BRANCH == 'origin/main' }
            }
            steps {
                withCredentials([
                    file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_FILE')
                ]) {
                    sh '''
                        export KUBECONFIG=$KUBECONFIG_FILE

                        echo "=== Pods ==="
                        kubectl get pods -n ${KUBE_NAMESPACE}

                        echo "=== Services ==="
                        kubectl get svc -n ${KUBE_NAMESPACE}

                        echo "=== Ingress ==="
                        kubectl get ingress -n ${KUBE_NAMESPACE}

                        echo "=== Secrets ==="
                        kubectl get secrets -n ${KUBE_NAMESPACE}

                        echo "=== ConfigMaps ==="
                        kubectl get configmaps -n ${KUBE_NAMESPACE}
                    '''
                }
            }
        }
        stage('Health Check') {
            agent any
            steps {
                script {
                    timeout(time: 2, unit: 'MINUTES') {
                        waitUntil {
                            script {
                                def response = sh(
                                    script: 'curl -s -o /dev/null -w "%{http_code}" https://jonathanlore.fr',
                                    returnStdout: true
                                ).trim()

                                if (response == '200') {
                                    echo "Frontend accessible"
                                    return true
                                } else {
                                    echo "En attente... (${response})"
                                    sleep 5
                                    return false
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            node('built-in') {
                sh "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true"
                sh "docker rmi ${DOCKER_IMAGE}:latest || true"
            }
        }
        success {
            withCredentials([string(credentialsId: 'discord-webhook-url', variable: 'DISCORD_URL')]) {
                discordSend(
                    webhookURL: DISCORD_URL,
                    title: "Deploiement Reussi : ${APP_NAME}",
                    link: env.BUILD_URL,
                    result: 'SUCCESS',
                    description: "Le build #${env.BUILD_NUMBER} a ete deploye avec succes sur Kubernetes.\n**Branche:** ${env.GIT_BRANCH_NAME}"
                )
            }
        }
        failure {
            withCredentials([string(credentialsId: 'discord-webhook-url', variable: 'DISCORD_URL')]) {
                discordSend(
                    webhookURL: DISCORD_URL,
                    title: "Echec du Pipeline : ${APP_NAME}",
                    link: env.BUILD_URL,
                    result: 'FAILURE',
                    description: "Le build #${env.BUILD_NUMBER} a echoue.\nConsulte les logs ici : ${env.BUILD_URL}console"
                )
            }
        }
    }
}
