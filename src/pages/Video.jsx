import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../FirebaseConfig";
import { child, get, ref } from "firebase/database";
import { Player } from "video-react";
import { useSelector } from "react-redux";

function Video() {
  const { id } = useParams();
  const { videos } = useSelector((state) => state.auth);
  const [Video, setVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(videos);
    const db = ref(database);
    get(child(db, `/videos`)).then((sp) => {
      if (sp.exists()) {
        const val = sp.val();
        const data = val.filter((filteredData) => {
          return filteredData.name === id;
        });
        console.log(data[0]);
        setVideo(data[0]);
      } else {
        console.log("no data result");
      }
    });
  }, []);

  return (
    <div className="h-screen overflow-y-hidden flex flex-col bg-background">
      <Navbar />
      <div className="h-full w-full flex items-center justify-between pl-7">
        {Video && (
          <Player fluid={false} height={800}>
            <source src={Video?.video} />
          </Player>
        )}

        <div className="overflow-y-auto flex flex-col h-[800px] w-[300px] bg-hover rounded-xl items-center py-7 gap-4">
          {videos?.map((video) => (
            <div
              onClick={() => navigate(`/Video/${video.name}`)}
              className="w-[250px] cursor-pointer hover:scale-105 transition-all duration-300 h-[150px] flex-shrink-0 p-3 rounded-xl bg-hover mb-10 mx-3 flex flex-col gap-3"
            >
              <img src={video.banner} className="w-full h-full rounded-xl" />
              <h3 className="text-white font-semibold text-[16px] w-full text-center h-auto">
                {video.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Video;
