import { DetailedHTMLProps, HTMLAttributes } from "react";

export const DefaultContainer = ({ children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => 
(<div {...props} className={"px-5 " + props.className} >{children}</div>)