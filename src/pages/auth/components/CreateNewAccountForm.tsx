import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { getErrorMessage } from "@/common/utils/error.util";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { registerAct } from "../action-creators/register.act";
import RegistrationContext from "../context/RegistrationContext";
import AuthErrorMassage from "./UI/AuthErrorMassage";
import { ArrowLeft } from "lucide-react";

function CreateNewAccountForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { slugText, setStep } = useContext(RegistrationContext);
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);

  // Function to handle login
  const onClickCreateAccount = async (e: any) => {
    e.preventDefault();
    if (slugText.length === 0) return;
    try {
      setLoader(true);
      await dispatch(registerAct({ ...formData, slug: slugText }));
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoader(false);
    }
  };

  const onBackStepClick = () => {
    setStep(1);
  };

  return (
    <div className="flex h-full items-center lg:w-1/2">
      <form className="flex flex-col gap-20">
        <div className="flex flex-col gap-3">
          <Button
            onClick={onBackStepClick}
            type="button"
            className="w-fit"
            icon={<ArrowLeft />}
            variant="ghost"
          />
          <h1 className="text-gray-500">profilepad.me/{slugText} is yours!</h1>
          <h1 className="text-4xl font-bold">Now, create your account.</h1>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Input
              className="h-12 border-0 bg-gray-100 outline-none focus-visible:ring-0"
              placeholder="Email address"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
            <Input
              className="h-12 border-0 bg-gray-100 outline-none focus-visible:ring-0"
              required
              placeholder="Password"
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
            />
          </div>
          <p className="text-xs font-extrabold text-gray-500 opacity-0">OR</p>
          <Button
            loading={loader}
            onClick={onClickCreateAccount}
            className="visible h-12 w-full"
          >
            Create Account
          </Button>
          {/* <Button className="visible h-12 w-full">
            <BiLogoGoogle />
            Sign in with Google
          </Button> */}
          <AuthErrorMassage
            show={errorMessage.length > 0}
            message={errorMessage}
          />
        </div>
        <div>
          <Link to="/login" className="text-xs text-gray-500">
            or log in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateNewAccountForm;