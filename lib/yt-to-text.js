import { YoutubeTranscript } from "youtube-transcript";
import youtube from "youtube-metadata-from-url"

export async function YtToText( link ) {
    return await YoutubeTranscript.fetchTranscript(link).then( async (res) => {

        const sumText = [];
        
        const text = res.filter(function(ress) {
            if (ress.text.includes('[')) {
              return false; // skip
            }
            return true;
          }).map( (val, index) => {
            let itemText = [];

            if ( val.text == '[Musik]' ) {
                return false;
            }
    
            if ( index !== 0 && index % 20 == 0 ) {
                itemText = ``;
            } else if ( index % 5 == 0 ) {
                itemText = ' '+ val.text + `.`;
            } else {
                const str = val.text;
                const str2 = str.charAt(0).toUpperCase() + str.slice(1);
                itemText = ' ' + str2;
            }
    
            return itemText;
        } );

        const chunkSize = 20;
        for (let i = 0; i < text.length; i += chunkSize) {
            const chunk = text.slice(i, i + chunkSize);
            
            sumText.push(chunk)
        }

        const yt = await youtube.metadata(link);

        return {
            title : yt?.title,
            image : yt?.thumbnail_url,
            text : sumText
        }
    })
}
