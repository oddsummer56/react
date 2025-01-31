import React, {useEffect} from "react";

function Visualize() {

    useEffect(() => {
        const divElement = document.getElementById('viz1735544240366');
        const vizElement = divElement.getElementsByTagName('object')[0];
        if ( divElement.offsetWidth > 800 ) {
            vizElement.style.width='1000px';
            vizElement.style.height='827px';
        } else if ( divElement.offsetWidth > 500 ) {
            vizElement.style.width='1000px';
            vizElement.style.height='827px';
        } else {
            vizElement.style.width='100%';
            vizElement.style.height='1677px';
        }
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
        vizElement.parentNode.insertBefore(scriptElement, vizElement);
    }, []);


    return (<>
        <div class='tableauPlaceholder' id='viz1735544240366' style={{position: "relative"}}>
            <noscript>
                <a href='#'>
                    <img alt='대시보드 1 ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ti&#47;ticketmoa_dashboard&#47;1_1&#47;1_rss.png' style={{border: "none"}} /></a>
            </noscript>
            <object class='tableauViz'  style={{display:"none"}}>
                <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
                <param name='embed_code_version' value='3' />
                <param name='site_root' value='' />
                <param name='name' value='ticketmoa_dashboard&#47;1_1' />
                <param name='tabs' value='no' />
                <param name='toolbar' value='yes' />
                <param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ti&#47;ticketmoa_dashboard&#47;1_1&#47;1.png' />
                <param name='animate_transition' value='yes' />
                <param name='display_static_image' value='yes' />
                <param name='display_spinner' value='yes' />
                <param name='display_overlay' value='yes' />
                <param name='display_count' value='yes' />
                <param name='language' value='en-US' />
                <param name='filter' value='publish=yes' />
            </object>
        </div>
    </>);
}

export default Visualize;


