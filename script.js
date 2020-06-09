new Vue({
  el: '#nescss',
  data() {
    return {
      brandicons: [
        'bttf.jpg',
        'cartman.jpg',
        'fguy.jpg',
        'flintstones.jpg',
        'ghostbusters.jpg',
        'homer.jpg',
        'ironman.jpg',
        'jack.jpg',
        'link.jpg',
        'mike.jpg',
        'runningman.jpg',
        'smurf.jpg',
        'spiderman.jpg',
        'sully.jpg'
      ],
      brandicon: '',
      animateOctocat: false,
      copiedBalloon: {
        display: 'none',
        top: 0,
        left: 0,
      },
      scrollPos: 0,
    };
  },
  filters: {
    capitalize(val) {
      if (!val) return '';
      val = val.toString();
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
  },
  mounted() {
    document.addEventListener('scroll', () => {
      this.scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    });
    hljs.initHighlightingOnLoad();
    [].forEach.call(document.querySelectorAll('dialog'), (a) => {
      dialogPolyfill.registerDialog(a);
    });
    this.replaceImages();
    var brandicon = 'icons/' + this.brandicons[Math.floor(Math.random() * this.brandicons.length)];
    this.brandicon = brandicon;

    (function () {
      var links = document.querySelectorAll("link[rel*='icon']");
      links.forEach(function(link) {
        //link.type = 'image/jpeg';
        //link.rel = 'shortcut icon';
        link.href = brandicon;
      });
    })();
  },
  methods: {
    copy(event, id) {
      this.showCopiedBalloon(event.pageY, event.pageX);

      const fake = document.createElement('textarea');
      fake.value = this.collection.find(a => a.title === id).code;
      fake.setAttribute('readonly', '');
      Object.assign(fake.style, {
        position: 'absolute',
        left: '-9999px',
      });
      this.$el.appendChild(fake);
      fake.select();
      document.execCommand('copy');
      this.$el.removeChild(fake);
    },
    startAnimate() {
      this.animateOctocat = true;
    },
    stopAnimate() {
      this.animateOctocat = false;
    },
    showCopiedBalloon(top, left) {
      this.copiedBalloon = {
        display: 'block',
        top: `${top - 100}px`,
        left: `${left - 180}px`,
      };
      setTimeout(() => {
        this.copiedBalloon.display = 'none';
      }, 1000);
    },
    replaceImages() {
      Array.from(document.querySelectorAll('img.lazy')).forEach((img) => {
        img.onload = () => img.classList.remove('lazy');
        img.src = img.dataset.src;
      });
    }
  },
});
