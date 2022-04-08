import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ofgc.app',
  appName: 'frontend',
  webDir: 'www',
  bundledWebRuntime: false,
  // plugins: {
  //   GoogleAuth: {
  //     scopes: ["profile", "email"],
  //     serverClientId: "577596447259-glbvoac3rsieomgkf5o5q6jcrg9c8v3b.apps.googleusercontent.com",
  //     // clientId: '577596447259-glbvoac3rsieomgkf5o5q6jcrg9c8v3b.apps.googleusercontent.com',
  //     forceCodeForRefreshToken: true,
  //     // grantOfflineAccess: true,
  //   }
  // }
};

export default config;
