import { useEffect } from "react";

export default function InstagramFeed() {
  useEffect(() => {
    // Optional: Load Elfsight app explicitly if not loaded
    const scriptId = "elfsight-platform-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      script.defer = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="elfsight-app-8153d32b-7126-4413-aa4b-e454ec2407b6" data-elfsight-app-lazy></div>
  );
}
