import { toast } from "react-hot-toast";
import CustomToast from "../components/common/CustomToast";

export const showSuccessToast = (message) => {
  toast.custom(
    (t) => (
      <CustomToast
        t={t}
        message={message}
        type="success"
      />
    ),
    {
      duration: 3000,
    }
  );
};

export const showErrorToast = (message) => {
  toast.custom(
    (t) => (
      <CustomToast
        t={t}
        message={message}
        type="error"
      />
    ),
    {
      duration: 3000,
    }
  );
};