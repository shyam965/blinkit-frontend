import toast from "react-hot-toast";

const AxiosToastError = () => {
  toast.error(error?.response?.data?.message);
};
export default AxiosToastError;
