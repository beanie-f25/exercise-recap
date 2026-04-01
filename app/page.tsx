"use client";

import { GoogleGenAI } from '@google/genai';
import { useState } from 'react';
const GEMINI_API_KEY = "AIzaSyBgJ2io7XP4K3U_fkFiFtjsRoyjBdErmFs";


import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://wcqigutbcrkxfbgdlqwn.supabase.co'
const supabaseKey = "sb_publishable_Xs2LA3ZWsHAZLlc3py8D_w_4m6oLPna"
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Home() {

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  // async function main() {

  //   const text = prompt("What do you want to ask the AI?");
  //   const response = await ai.models.generateContent({
  //     model: 'gemini-2.5-flash-lite',
  //     contents: String(text)
  //   });
  //   alert(response.text);
  // }

  async function write() {

    const text = prompt("What do you want to say?");

    if (text) {

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-lite',
          contents: String(text)
        });


      const { data, error } = await supabase
        .from('messages')
        .insert([
          { message: text, response: response.text },
        ])
        .select();


      if (data) {
        setMessages((prev) => [...prev, ...data]);
      }


    }
  }

  // let { data: messages, error } = await supabase
  //   .from('messages')
  //   .select('*')

  const [messages, setMessages] = useState<any[]>([]);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*');

    if (data) {
      setMessages(data);
    }
  }

  useState(() => {
    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">


      <ul>
        {messages?.map((message) => (
          <li key={message.id}>{message.message}: {message.response}</li>
        ))}

      </ul>

      <button onClick={(e) => {
        // main();
        write();
      }}>Leave your message me</button>



    </div>
  );
}
