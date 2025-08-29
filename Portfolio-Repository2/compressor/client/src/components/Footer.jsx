export default function Footer() {
    return(
    <div className="w-full bg-gray-50/80 backdrop-blur-md shadow-md  text-center py-3 px-auto">
        <p className="text-sm text-slate-600">
            {new Date().getFullYear()} &copy; MRA Web Developers. All rights reserved.
        </p>
    </div>
    )
}