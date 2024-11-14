import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ModeToggle } from "./ModeToggle"


const Header = () => {
  return (
    <nav className="flex justify-between items-center p-10">
        <div className="grow">Logo</div>
        <div className="flex items-center gap-3">
            <ModeToggle />
            <ConnectButton />
        </div>
    </nav>
  )
}

export default Header;