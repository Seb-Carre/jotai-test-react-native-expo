import NetInfo from "@react-native-community/netinfo"

NetInfo.configure({
  reachabilityUrl: "https://google.com/",
  reachabilityTest: async (response) => {
    return response.status === 200
  },
  reachabilityLongTimeout: 60 * 1000, // 60s
  reachabilityShortTimeout: 5 * 1000, // 5s
  reachabilityRequestTimeout: 15 * 1000, // 15s
})

export default NetInfo