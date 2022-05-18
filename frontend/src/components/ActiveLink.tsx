import { Link } from "react-router-dom";
import { LinkProps, useMatch, useResolvedPath } from "react-router-dom";

export default function CustomLink({ children, to, ...props }: LinkProps) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link
            className={match ? "router-link-active" : ""}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
}