import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { checkAuthentication } from "../../features/auth/authThunks.js";

export default function GoogleSuccess() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {

        const verify = async () => {
            const result = await dispatch(checkAuthentication());
            if (checkAuthentication.fulfilled.match(result)) {

                const profileCompleted =
                    result.payload.profileCompleted;

                if (!profileCompleted) {

                    navigate("/complete-profile");

                } else {

                    navigate("/");

                }

            } else {

                navigate("/login");

            }

        };

        verify();

    }, []);

    return <h2>Signing you in...</h2>;

}