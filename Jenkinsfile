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
                sh "docker build -t $FRONT_IMAGE_NAME:$IMAGE_TAG -f Dockerfile.front ."
                sh "docker build -t $BACK_IMAGE_NAME:$IMAGE_TAG -f ./backend/Dockerfile.back ./backend"
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
                    withCredentials([usernamePassword(credentialsId: 'ghcr-creds', usernameVariable: 'GH_USER', passwordVariable: 'GH_PAT'), file(credentialsId: 'db-env', variable: 'DB_ENV_FILE')]) {
                        sh """
                            # Copy docker-compose.yml to server
                             scp docker-compose.yml $SERVER:/var/lib/jenkins/docker-compose.yml
                             # Ensure backend directory exists and copy .env file as .env.tmp, then move and set permissions
                             ssh $SERVER 'mkdir -p /var/lib/jenkins/backend'
                             scp $DB_ENV_FILE $SERVER:/var/lib/jenkins/backend/.env.tmp
                             ssh $SERVER 'mv /var/lib/jenkins/backend/.env.tmp /var/lib/jenkins/backend/.env && chmod 600 /var/lib/jenkins/backend/.env'
                             # Login to registry on server
                             ssh $SERVER 'echo $GH_PAT | docker login $REGISTRY -u $GH_USER --password-stdin'
                             # Pull latest images using docker-compose
                             ssh $SERVER 'cd /var/lib/jenkins &&  docker compose -f docker-compose.yml pull'
                             # Bring up services
                             ssh $SERVER 'cd /var/lib/jenkins &&  docker compose -f docker-compose.yml --env-file .env up -d'
                             # Clean up .env file for security
                             ssh $SERVER 'rm -f /var/lib/jenkins/backend/.env'
                        """
                    }
                }
            }
        }
    }
}
