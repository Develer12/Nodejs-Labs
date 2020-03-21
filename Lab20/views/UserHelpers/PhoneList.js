module.exports = {
  list: (context, opt)=>{
    return context.map((item)=>{
      return `
        <div class="ph-item" onclick="Change(this)">
          <span id="list-fio">${item.fio}</span>
          <span id="list-number">${item.number}</span>
        </div>`
    }).join('\n')
  }
}
