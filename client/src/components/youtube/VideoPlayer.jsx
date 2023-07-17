import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import axios from 'axios';
import VideoList from "@/components/youtube/videoList";
import VideoDetail from "@/components/youtube/videoDetail";
import SearchBar from "@/components/youtube/searchBar";
import VideoComments from "@/components/youtube/videoComments";
import CommentBox from "@/components/youtube/commentBox";

import youtube from "@/components/api/youtube";

const api_key = 'AIzaSyANvvRl8V20qOmKPvm4DPlXI9WHSGG66bI';
function VideoPlayer() {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [commentData, setCommentData] = useState(null);
    const [videoId, setVideoId] = useState('eIrMbAQSU34');

    useEffect(() => {
        handleSubmit('react js');
        handleComment();
    }, []);

    const handleSubmit = async (searchValue) => {
        try {
            const response = await youtube.get("search", {
                params: {
                    part: 'snippet',
                    maxResults: 20,
                    key: api_key,
                    q: searchValue,
                }
            });
            setVideos(response.data.items);
            setSelectedVideo(response.data.items[0]);
            setVideoId(response.data.items[0].id.videoId);
        } catch (ex) {
            console.log('api error', ex.message);
        }
        await handleComment();
    }

    const handleComment = async () => {
        try {
            const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?key=${api_key}&textFormat=plainText&part=snippet&videoId=${videoId}&maxResults=10`);
            setCommentData(data);
        } catch (ex) {
            console.log(ex.message);
        }
    }

    const onVideoSelect = async (video) => {
        setSelectedVideo(video);
        setVideoId(video.id.videoId);

        await handleComment();
    }

    const onHhandleComment = async (comment) => {
        try {
            const { data } = await axios.post(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=${api_key}`).then(
                {
                    "snippet": {
                        "topLevelComment": {
                            "snippet": {
                                "textOriginal": "YOUR_COMMENT_HERE",
                                "videoId": { videoId }
                            }
                        }
                    }
                }
            );
            console.log("comment: ", data);
        } catch (ex) {
            console.log(ex.message);
        }
    }

    return (
        <Grid justify="center" container spacing={10} style={{ marginLeft: -75 }}>
            <Grid item xs={12} style={{ marginLeft: 30 }}>
                <Grid container spacing={10}>
                    <Grid item xs={12} style={{ marginTop: '-7px' }}>
                        <SearchBar onFormSubmit={handleSubmit} />
                    </Grid>
                    <Grid item xs={8} style={{ marginTop: '-50px' }}>
                        <VideoDetail video={selectedVideo} />
                    </Grid>
                    <Grid item xs={4}>
                        <VideoList videos={videos} onVideoSelect={onVideoSelect} />
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginLeft: 30, marginTop: -1500 }}>
                    <hr style={{ width: '64%', marginLeft: -5 }} />
                    <CommentBox onHandleComment={onHhandleComment} />
                    <VideoComments commentData={commentData} />
                </Grid>
            </Grid>
        </Grid>
    );
}
export default VideoPlayer;