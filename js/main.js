var footer = {
    itemWidth: null,
    ulWidth: null,
    ulPosition: null,
    init: function() {
        this.$footer = $('footer')
        this.$box = $('.box')
        this.$ul = this.$footer.find('ul') 
        this.canRight = true
        this.canLeft = false
        this.render()
        this.bind()
        
    },
    render: function() {
        $.getJSON('https://jirenguapi.applinzi.com/fm/getChannels.php')
            .done((e) => {
                this.renderFooter(e.channels)
            })
    },
    renderFooter: function(channels) {
        var html = ''
        channels.forEach(channel => {
            html = html + `
            <li data-channel-id='${channel.channel_id}' 
            data-channel-name='${channel.name}'>
                <div class="cover"  
                style="background-image:url(${channel.cover_small})"></div>
                <h3>${channel.name}</h3>
            </li>  
            `   
        })
        this.$ul.append(html)
        this.itemWidth = this.$ul.find('li').outerWidth(true)  
        this.setStyle()   
        this.ulWidth = parseFloat(this.$ul.css('width'))
        this.ulPosition = parseFloat(this.$ul.css('left'))
    },
    setStyle: function() {
        var number = this.$ul.find('li').length
        this.$ul.css({
            width: number * this.itemWidth 
        }) 
    },
    bind: function() {
        $('.right').on('click', () => {
            if (this.canRight) {
                this.canRight = false
                this.$ul.animate({  
                    left: '-=' + 3 * this.itemWidth
                },400,() => {
                    this.ulPosition = parseFloat(this.$ul.css('left')) 
                    this.canLeft = true
                    if(this.$box.width()-this.ulWidth >= this.ulPosition) {
                        this.canRight = false
                    } else {
                        this.canRight = true
                    }
                })
            }                  
        })
    }
}