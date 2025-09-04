pipeline {
    agent any

    environment {
        REGISTRY = "ghcr.io"
        IMAGE_NAME = "ghcr.io/sbush92/portfolio"
        IMAGE_TAG  = "latest"
        SERVER     = "jenkins@192.168.86.234"
    }

    stages {
        
        stage('Checkout') {
            steps {
                git 'https://github.com/sbush92/Portfolio.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME:$IMAGE_TAG ."
            }
        }

        stage('Push to GHCR') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'ghcr-creds', usernameVariable: 'GH_USER', passwordVariable: 'GH_PAT')]) {
                    sh """
                        echo $GH_PAT | docker login $REGISTRY -u $GH_USER --password-stdin
                        docker push $IMAGE_NAME:$IMAGE_TAG
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
                            ssh $SERVER 'docker pull $IMAGE_NAME:$IMAGE_TAG'
                            ssh $SERVER 'docker stop portfolio || true && docker rm portfolio || true'
                            ssh $SERVER 'docker run -d --name portfolio -p 1234:80 $IMAGE_NAME:$IMAGE_TAG'
                        """
                    }
                }
            }
        }
    }
}
