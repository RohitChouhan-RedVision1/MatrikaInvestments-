import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function Banner({ title }) {
    return (
        <div className="page-header">
            <div className="container mx-auto">
                <div className="items-center">
                    <div className="page-header-box">
                        <h1 className="text-anime-style-2" data-cursor="-opaque">
                            {title}
                        </h1>
                        <Breadcrumb>
                            <BreadcrumbList className="text-white">
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
            </div>
        </div>
    )
}
