import ModuleCard from "./ModuleCard";

export default function ProfileCard({data}){
return (
<div className="mt-6 bg-white rounded-xl shadow p-5">
<h2 className="text-xl font-bold">{data.nama}</h2>
<p>NIK: {data.nik}</p>
<p>Section: {data.section}</p>
<p>Current Level: {data.level}</p>
<p>Basic Wajib: {data.basic}</p>

<h3 className="font-bold mt-5">Module Training</h3>

{data.modules?.map((module,index)=>(
<ModuleCard key={index} module={module}/>
))}
</div>
)
}
