const Utility = {
  isHost(domain) {
      let host = domain.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
      return new RegExp(host).test(window.location.host)
    }
}

export default Utility
