import Main from "@/components/Main";
import { Sidebar } from "@/once-ui/modules/layout/SidebarAdmin";

export default function LayoutDashboardAdmin({children}:{children:React.ReactNode}){
    return (
        <div>
            <Sidebar />
            <Main>
            {children}
            </Main>
        </div>
    )
}