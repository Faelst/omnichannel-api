import env from "@main/config/env";
import App from "@main/config/app";

App.listen(env.port, () => {
  console.log(`Server is running on port ${env.port} 🚀"`);
});
