// Generated by CoffeeScript 1.6.3
(function() {
  var TradeAssistSuggestions,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TradeAssistSuggestions = (function(_super) {
    __extends(TradeAssistSuggestions, _super);

    function TradeAssistSuggestions(inputElement, tradeAssist) {
      this.tradeAssist = tradeAssist;
      this.inputElement = $(inputElement);
      this.container = $('<ul class="suggestions"></ul>');
      this.events = {};
    }

    TradeAssistSuggestions.prototype.suggest = function(name) {
      var _ref, _ref1,
        _this = this;
      if (name !== "") {
        if (((_ref = this.xhr) != null ? _ref.readyState : void 0) !== 4) {
          if ((_ref1 = this.xhr) != null) {
            _ref1.abort();
          }
        }
        this.xhr = $.getJSON(this.url, {
          action: 'suggest',
          arg: name
        }, function(response) {
          if (name === _this.lastSuggest) {
            if ((response != null ? response.cards.length : void 0) > 0) {
              return _this.show(new TradeAssistCard(response.cards));
            } else {
              return _this.hide();
            }
          }
        });
        return this.lastSuggest = name;
      } else {
        return this.hide();
      }
    };

    TradeAssistSuggestions.prototype.show = function(cards) {
      var w,
        _this = this;
      if (cards) {
        this.container.empty();
        $.each(cards, function(index, card) {
          var displayname, line, realname, searchPattern;
          line = $('<li class="suggestion' + (index ? '' : ' active') + '"></li>').data('card', card);
          realname = "";
          displayname = "";
          searchPattern = _this.escapeRegExp(_this.lastSuggest);
          if (!_this.lastSuggest || new RegExp(searchPattern, "i").test(card.getName())) {
            displayname = card.getName().replace(new RegExp("(" + searchPattern + ")", "i"), '<em>$1</em>');
          } else {
            displayname = card.getName('de').replace(new RegExp("(" + searchPattern + ")", "i"), '<em>$1</em>');
            realname = card.getName();
          }
          line.append($("<span class='name'>" + displayname + "</span>"));
          if (realname !== "") {
            line.append($("<span class='name_real'>(" + realname + ")</span>"));
          }
          line.append($("<img class='thumbnail'/>").attr({
            src: card.getImage(),
            title: card.getName(),
            alt: card.getName()
          }));
          line.prepend($("<img class='edition'/>").attr({
            src: card.getEditionImage(),
            title: card.getEdition(),
            alt: card.getEdition(true)
          }));
          if (card.getEditions().length > 1) {
            line.prepend($('<div class="arrow left">&larr;</div>').on('click', function(e) {
              e.stopPropagation();
              return _this.left(line);
            }));
            line.prepend($('<div class="arrow right">&rarr;</div>').on('click', function(e) {
              e.stopPropagation();
              return _this.right(line);
            }));
          }
          line.on({
            click: function() {
              return _this.fireEvent('click', [card]);
            },
            mouseenter: function() {
              if (!line.is('.active')) {
                $('li.active', _this.container).removeClass('active');
                return line.addClass('active');
              }
            }
          });
          return _this.container.append(line);
        });
      }
      if (!this.isUp() && $('li.suggestion', this.container).length) {
        this.inputElement.parent('.input').after(this.container);
        w = $(window);
        if (w.height() + w.scrollTop() < this.container.offset().top + this.container.outerHeight()) {
          return $('html').animate({
            scrollTop: this.container.offset().top + this.container.outerHeight() - w.height()
          });
        }
      }
    };

    TradeAssistSuggestions.prototype.hide = function() {
      if (this.isUp()) {
        return this.inputElement.parent('.input').next('.suggestions').detach();
      }
    };

    TradeAssistSuggestions.prototype.isUp = function() {
      return this.inputElement.parent('.input').next('.suggestions').length > 0;
    };

    TradeAssistSuggestions.prototype.fire = function() {
      this.hide();
      return $('li.active', this.container).trigger('click');
    };

    TradeAssistSuggestions.prototype.down = function() {
      var current;
      if (this.isUp()) {
        if ($('li.suggestion', this.container).length <= 1) {
          return;
        }
        current = $('li.active', this.container).removeClass('active');
        if (current.next('li.suggestion').addClass('active').length === 0) {
          return $('li.suggestion:first', this.container).addClass('active');
        }
      } else {
        return this.show();
      }
    };

    TradeAssistSuggestions.prototype.up = function() {
      var current;
      if (this.isUp()) {
        if ($('li.suggestion', this.container).length <= 1) {
          return;
        }
        current = $('li.active', this.container).removeClass('active');
        if (current.prev('li.suggestion').addClass('active').length === 0) {
          return $('li.suggestion:last', this.container).addClass('active');
        }
      } else {
        return this.show();
      }
    };

    TradeAssistSuggestions.prototype.changeEdition = function(line, right) {
      var card;
      if (this.isUp()) {
        if (line == null) {
          line = $('li.active', this.container);
        }
        card = line.data('card');
        if (card.getEditions().length > 1) {
          card.setEdition(right);
          if (!this.tradeAssist.isMobile) {
            $('.thumbnail', line).attr('src', card.getImage());
          }
          return $('.edition', line).attr({
            alt: card.getEdition(true),
            title: card.getEdition(),
            src: card.getEditionImage()
          });
        }
      }
    };

    TradeAssistSuggestions.prototype.left = function(line) {
      return this.changeEdition(line, false);
    };

    TradeAssistSuggestions.prototype.right = function(line) {
      return this.changeEdition(line, true);
    };

    TradeAssistSuggestions.prototype.escapeRegExp = function(string) {
      return string.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, function(match) {
        return '\\' + match;
      });
    };

    return TradeAssistSuggestions;

  })(TradeAssistBase);

  window.TradeAssistSuggestions = TradeAssistSuggestions;

}).call(this);

/*
//@ sourceMappingURL=tradeassist.suggestions.map
*/
