export default function ModuleCard({module}){
return (
<div className="border rounded-lg p-4 mt-3">
<h4 className="font-semibold">{module.module}</h4>
<p>{module.category}</p>
<a
href={module.link}
target="_blank"
className="block mt-3 bg-[#b4008c] text-white text-center p-2 rounded">
Mulai Training
</a>
</div>
)
}
