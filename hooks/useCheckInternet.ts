
// pas utile
// import { useEffect, useRef } from "react"

// import { Alert } from "react-native"
// import NetInfo from "../network/NetInfo"
// import { internetConnectionAtom } from "../navigation"
// import { useAtom } from "jotai"

// export default function useCheckInternet() {
//     const [networkInfo, setNetworkInfo] = useAtom(internetConnectionAtom)
//     const lastState = useRef<number>(0)
//     const areYouConnected = useRef<boolean>(true)
//     useEffect(() => {
//       const unsubscribe = NetInfo.addEventListener((state) => {
//         const randomID = Math.random()
//         // Update state only with internetreachable
//         lastState.current = randomID
  
//         // we do this because of state which can change always and makes the app state pretty bad ! Get the last update only !
//         const timeout = setTimeout(() => {
//           if (lastState.current === randomID) {
//             setNetworkInfo({ isInternetReachable: state.isInternetReachable })
//           }
//           clearTimeout(timeout)
//         }, 3000)
//       })
  
//       return () => unsubscribe()
//     }, [])
  
//     useEffect(() => { // if network does change and do something !
//       if (
//         networkInfo !== undefined &&
//         networkInfo?.isInternetReachable !== areYouConnected.current &&
//         networkInfo.isInternetReachable !== null
//       ) {
//         areYouConnected.current = networkInfo?.isInternetReachable
  
//         if (!networkInfo.isInternetReachable) {
//           Alert.alert("No connection")
//         } else {
//           Alert.alert("Connection is back")
//         }
//       }
//     }, [networkInfo])
//   }