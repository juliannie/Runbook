"use client";
import { useRouter } from "next/navigation";

const NavigateButton = ({ row }: { row: any }) => {
  const router = useRouter();
  const handleClick = () => {
    // Perform your custom action using `row` data
    router.push("/tasks");
    console.log("Performing custom action on row:", row);
  };

  return <button onClick={handleClick}>Perform Action</button>;
};

export default NavigateButton;
