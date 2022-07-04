export const tailwindParse =  (html) => {
    console.log("aaaaa", html);
    html = html.replace("<h2>", "<h2 className='text-2xl text-semibold'>");
    html = html.replace("<h3>", "<h3 className='text-xl text-medium'>");
    html = html.replace("<ul>", "<ul className='list-disc'>");
    html = html.replace("<ol>", "<ol className='list-decimal'>");
    html = html.replace("<blockquote>", "<blockquote className='ml-1 px-2 py-1 bg-slate-200'>");
    html = html.replace('<li data-bangle-name="listItem" data-bangle-attrs="{&quot;todoChecked&quot;:true}">',
        '<li data-bangle-name="listItem" data-bangle-attrs="{&quot;todoChecked&quot;:true}" className="flex items-center"><input type="checkbox" className="checkbox-sm" checked disabled/>');
    html = html.replace('<li data-bangle-name="listItem" data-bangle-attrs="{&quot;todoChecked&quot;:false}">',
        '<li data-bangle-name="listItem" data-bangle-attrs="{&quot;todoChecked&quot;:true}" className="flex items-center"><input type="checkbox" className="checkbox-sm"  disabled/>');

    return html;
}
