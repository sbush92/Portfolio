pipeline {
    agent any

    environment {
        REGISTRY = "ghcr.io"
        FRONT_IMAGE_NAME = "ghcr.io/sbush92/portfolio"
        BACK_IMAGE_NAME = "ghcr.io/sbush92/portfolio-backend"
        IMAGE_TAG  = "latest"
        SERVER     = "jenkins@192.168.86.234"
    }

    stages {
        
        stage('Checkout') {
            steps {
                 git branch: "${env.BRANCH_NAME}", url: 'https://github.com/sbush92/Portfolio.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $FRONT_IMAGE_NAME:$IMAGE_TAG ."
                sh "docker build -t $BACK_IMAGE_NAME:$IMAGE_TAG ./backend"
            }
        }

        stage('Push to GHCR') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'ghcr-creds', usernameVariable: 'GH_USER', passwordVariable: 'GH_PAT')]) {
                    sh """
                        echo $GH_PAT | docker login $REGISTRY -u $GH_USER --password-stdin
                        docker push $FRONT_IMAGE_NAME:$IMAGE_TAG
                        docker push $BACK_IMAGE_NAME:$IMAGE_TAG
                    """
                }
            }
        }

        stage('Deploy on Webserver') {
            steps {
                sshagent(['agent1']) {
                    withCredentials([usernamePassword(credentialsId: 'ghcr-creds', usernameVariable: 'GH_USER', passwordVariable: 'GH_PAT')]) {
                        sh """
                            ssh $SERVER 'echo $GH_PAT | docker login $REGISTRY -u $GH_USER --password-stdin'
                            ssh $SERVER 'docker pull $FRONT_IMAGE_NAME:$IMAGE_TAG'
                            ssh $SERVER 'docker pull $BACK_IMAGE_NAME:$IMAGE_TAG'
                            ssh $SERVER 'docker stop portfolio_frontend || true && docker rm portfolio_frontend || true'
                            ssh $SERVER 'docker stop portfolio_backend || true && docker rm portfolio_backend || true'
                            ssh $SERVER 'docker run -d --name portfolio_frontend -p 80:80 $FRONT_IMAGE_NAME:$IMAGE_TAG'
                            ssh $SERVER 'docker run -d --name portfolio_backend -p 8080:8080 $BACK_IMAGE_NAME:$IMAGE_TAG'
                        """
                    }
                }
            }
        }
    }
}
