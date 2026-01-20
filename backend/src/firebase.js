import admin from "firebase-admin";
import serviceAccount from '../.secret/flowcode-task-firebase-adminsdk-fbsvc-762a26ff95.json' with { type: 'json' };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;
