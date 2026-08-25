"use client";

import {useState} from "react";
import {searchPPM} from "@/lib/api";
import ProfileCard from "@/components/ProfileCard";

export default function Home(){
 const [keyword,setKeyword]=useState("");
 const [data,setData]=useState(null);
 const [loading,setLoading]=useState(false);

 async function handleSearch(){
  setLoading(true);
  const result=await searchPPM(keyword);
  if(result.status) setData(result.data);
  else {alert(result.message); setData(null);}
  setLoading(false);
 }

 return (
  <main className="min-h-screen bg-gray-100 p-5">
   <div className="max-w-xl mx-auto">
    <h1 className="text-3xl font-bold text-center">
     AEON PPM TRAINING
    </h1>

    <div className="bg-white rounded-xl shadow p-5 mt-6">
     <input
      className="w-full border rounded-lg p-3"
      placeholder="Masukkan NIK atau Nama"
      value={keyword}
      onChange={(e)=>setKeyword(e.target.value)}
     />
     <button
      onClick={handleSearch}
      className="mt-4 w-full bg-[#b4008c] text-white rounded-lg p-3">
      {loading ? "Mencari..." : "Cari Data"}
     </button>
    </div>

    {data && <ProfileCard data={data}/>}
   </div>
  </main>
 )
}
