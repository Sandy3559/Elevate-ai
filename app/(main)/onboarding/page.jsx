import { getUserOnboardingStatus } from "@/actions/user";
import { industries } from "@/data/industries";
import { redirect } from "next/navigation";
import OnboardingForm from "./_components/onboarding-form";

const OnboardingPage = async () => {
    //Check if user is already onboarded
    const { isOnboarded } = await getUserOnboardingStatus();

    //console.log("ONBOARDING PAGE:", isOnboarded);

    if(isOnboarded) {
        redirect("/dashboard");
    }

    return (
    <main>
        <OnboardingForm industries = {industries} />
        </main>
    );
};

export default OnboardingPage;