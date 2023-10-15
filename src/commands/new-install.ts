import { Command, Opt } from "./lib/command.js";

import { loadPackage } from "../distribution/package.js";
import { stderr, stdout } from "process";


const cmd = new Command("Test new install command", {
    action: async (options: Record<string, string | boolean>) => {
        const pkgPath = options["package"] as string;
        const port = options["port"] as string;

        if (!port) {
            stderr.write("Port not specified\n");
            throw 1;
        }

        stdout.write("Loading package...\n");

        const pkg = await loadPackage(pkgPath);

        stdout.write("Version: " + pkg.getManifest().getVersion() + "\n");
        stdout.write("Board: " + pkg.getManifest().getBoard() + "\n");
        stdout.write("Platform: " + pkg.getManifest().getPlatform() + "\n");
        stdout.write("\n");

        await pkg.flash(port);
    },
    args: [],
    options: {
        "package": new Opt("Uri to the package file", { required: true })
    },
    chainable: false
});

export default cmd;
