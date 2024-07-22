/** @param {NS} ns */
export async function main(ns) {
  let cur_level = ns.getHackingLevel();
  let servers = ns.scan()

  for(var x=0; x<servers.length; ++x) {
    let server = servers[x]
    let is_root = ns.hasRootAccess(server)
    let ports_req = ns.getServerNumPortsRequired(server)

    if(!is_root && ports_req<1) {
      ns.connect(server)
      ns.nuke(server)
      if(server != "home" && ns.getRunningScript("main.js") != null) {
        ns.wget("", "main.js")
        ns.run("main.js")
      }
    }
  }
}
