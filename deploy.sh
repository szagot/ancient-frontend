npm run build:prod

ssh -i /c/DataCore/AWS/cazadiablos.pem ec2-user@52.206.107.239 'rm -rf /var/www/html/ancient/frontend/*'

scp -ri /c/DataCore/AWS/cazadiablos.pem ./dist/ancient-frontend/browser/* ec2-user@52.206.107.239:/var/www/html/ancient/frontend/