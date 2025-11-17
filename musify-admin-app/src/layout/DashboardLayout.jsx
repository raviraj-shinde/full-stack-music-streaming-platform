import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({children, activeMenu}) => {
    return (
        <div>
            <Navbar activeMenu={activeMenu}/>
            <div className="flex">
                <div className="max-[1080px]:hidden">
                    <Sidebar activeMenu={activeMenu}/>
                </div>
                <div className="grow mx-5">{children}</div>
            </div>
        </div>
    );
}

export default DashboardLayout;