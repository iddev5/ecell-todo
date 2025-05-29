import { Mail } from "lucide-react";
import { Button } from "./components/ui/button";
import { getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./lib/firebase";
import { useAppDispatch } from "./lib/store";
import api from "./lib/api";
import { useNavigate } from "react-router";

export default function Index() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const signIn = async () => {
        const res = await signInWithPopup(auth, googleProvider);
        const additionalInfo = getAdditionalUserInfo(res);

        if (additionalInfo?.isNewUser) {
            dispatch(api.createUser());
        }

        navigate('/app');
    }
    
    return (
        <Button onClick={signIn}>
            <Mail /> Sign in with Google
        </Button>
    );
}