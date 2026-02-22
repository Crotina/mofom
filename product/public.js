export async function loadSequentialData(cat) {
	const baseUrl = `./${cat}`;
	let result = [];
		
	try {
	    const mainResponse = await fetch(`${baseUrl}/main.json`);
	    if (!mainResponse.ok) {
	        throw new Error(`cannot load main.json: HTTP ${mainResponse.status}`);
	    }
		
	    const mainData = await mainResponse.json();
	    const fileList = mainData.files || [];

	    if (fileList.length === 0) {
	        throw new Error('main.json does not have a list in it');
	    }

	    console.log(`${fileList.length} files in list`, fileList);
		
	    for (const filename of fileList) {
	        try {
	            const response = await fetch(`${baseUrl}/${filename}`);
	            if (!response.ok) {
	                throw new Error(`load failed: ${filename}, HTTP ${response.status}`);
	            }

	            const data = await response.json();
	            result.push(data);
	        } catch (fileError) {
	            console.warn(`skip ${filename}:`, fileError);
	        }
	    }
	    return result;
		
	} catch (error) {
	    console.error(error);
	    return [];
	}
}

export async function loadItemData(category, itemId) {
    try {
        let respon_1 = await fetch(`./${category}/main.json`);
        let data_1 = await respon_1.json();

        console.log(data_1);

        let respon = await fetch(`./${category}/${data_1.files[parseInt(itemId)]}`);
        let data = respon.json();

        return data;
    } catch(error) {
        console.error(error);
        return
    }

}

export function goToDetailPage(cat, itemId) {
    
	if (typeof itemId !== 'number') {
	    console.error('it must be a number: ' + itemId);
	    return;
	}
		
	const targetUrl = `detail.html?category=${cat}&id=${itemId}`;
		
	// 执行跳转
	window.location.href = targetUrl;
}
window.goToDetailPage = goToDetailPage;

export const urlParams = new URLSearchParams(window.location.search);