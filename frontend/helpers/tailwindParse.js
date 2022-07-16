import fs from "fs";

export const tailwindParse =  (html) => {
    console.log("aaaaa", html);
    html = html.replaceAll("<h2>", "<h2 className='text-2xl text-semibold pb-2'>");
    html = html.replaceAll("<h3>", "<h3 className='text-xl text-medium pb-2'>");
    html = html.replaceAll("<ul>", "<ul className='list-disc'>");
    html = html.replaceAll("<ol>", "<ol className='list-decimal'>");
    html = html.replaceAll("<p>", "<p className='pb-2'>")
    html = html.replaceAll("<blockquote>", "<blockquote className='ml-1 px-2 py-1 bg-slate-200'>");
    html = html.replaceAll('<li data-bangle-name="listItem" data-bangle-attrs="{&quot;todoChecked&quot;:true}">',
        '<li data-bangle-name="listItem" data-bangle-attrs="{&quot;todoChecked&quot;:true}" className="flex items-center"><input type="checkbox" className="checkbox-sm" checked disabled/>');
    html = html.replaceAll('<li data-bangle-name="listItem" data-bangle-attrs="{&quot;todoChecked&quot;:false}">',
        '<li data-bangle-name="listItem" data-bangle-attrs="{&quot;todoChecked&quot;:true}" className="flex items-center"><input type="checkbox" className="checkbox-sm"  disabled/>');
    // html = html.replace( '<iframe width="560" height="315" src="https://www.youtube.com/embed/lJIrF4YjHfQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
    console.log(html.indexOf('<a href="https://www.youtube.com/watch?v='))
    while(html.indexOf('<a href="https://www.youtube.com/watch?v=') >=  0) {
        let a_start = html.indexOf('<a href="https://www.youtube.com/watch?v=');
        let id_start = a_start + 41
        let id_end = html.indexOf('"', id_start);
        let im_data = html.substring(id_start, id_end);
        html = html.replace(/<a href="https:\/\/www\.youtube\.com\/watch\?v=.*?<\/a>/, '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + im_data + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    }
    // console.log(text);
    html = html.replaceAll("<a", "<a className='text-blue-700 underline'");

    return html;
}
