import Link from "next/link";

export default function HomeHeader() {
    return <div className="gridsys">
        <div className="mt-2 rounded-lg  bg-blue-600 h-10 col-start-3 col-span-8">
            <Link href='/tools' className="italic">Tools</Link>
        </div>
    </div>
}