# TybaApp
React native app tested only on Android devices (emulator and real device)

# Set up
download the project and run npm install && yarn then run npx react-native run-android
if you have a real device connected be sure you have the developer options set on the device, connect to the computer and run npx react-native run-android again to load the app on real device

# Important Info
1. The LogIn and register is not saving the user in DB, I know the proccess to register and Log an user
2. The restaurants API that I found provide multiple result I'm just showing the first 20, a pagination component would be there
3. The search by location works but unfurtunaly the API does not provide info to Colombia, so the result could be similar. you can see the console logs with the longitude and latitude information from the device
4. It's a warning appear in the History screen, react Native update the AsyncStorage and move it to another library that was crashing my app, that's the reason why I used the old one, but it's working