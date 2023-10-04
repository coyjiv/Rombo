import { DetailedHTMLProps, HTMLAttributes } from "react";

export const DefaultContainer = ({ children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => 
(<div {...props} className={"px-5 " + props.className} >{children}</div>)

export const PagesContainer = ({ children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => 
(<div {...props} className={"w-full p-4 h-screen bg-medium-purple " + props.className} >{children}</div>)
