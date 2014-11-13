---
layout: home
---

<div class="featured">
  <div class="content">
    <h3>Update: Front-End Conf Continues!</h3>
    <h1>The show must go on!</h1>
    <h3><a href="http://frontendconf.com" target="_blank">Click here for details</a></h3>
    <hr>
    <p>Dan and Cherrie Denney have put on <a href="http://frontendconf.com" target="_blank">Front-End Design Conference</a> for the past 6 years in St. Petersburg, Florida and are wrapping up with a finale in Portland. There are many of us who are incredibly thankful for the event and want to make sure they know just how much.</p>
    <p>Read, reminisce, share <a href="https://twitter.com/hashtag/frontendthanks?f=realtime">#frontendthanks</a>, <a href="/tshirt">buy the shirt</a>, and then <a href="/contribute">contribute</a> yourself to Dan and Cherrie's great works.</p>
  </div>
</div>

{% include search.html %}

<ul class="content">

  {% for thanks in site.thanks %}
    <li id="{{ thanks.name | replace:' ' | truncatewords: 1 | remove:'...' }}" class="anchor">
      <span class="thanks">
        {% if thanks.title %}
          <h1><a href="#{{ thanks.name | replace:' ' | truncatewords: 1 | remove:'...' }}">{{ thanks.title }}</a></h1>
        {% else %}
          <h1><a href="#{{ thanks.name | replace:' ' | truncatewords: 1 | remove:'...' }}">{{ thanks.name }}</a></h1>
        {% endif %}

        <span class="meta">Published {{ thanks.date | date: "%B %d, %Y" }} by {{ thanks.name }}

        {% if thanks.twitter %}
          (<a href="http://twitter.com/{{ thanks.twitter }}" target="_blank">@{{ thanks.twitter }}</a>)
        {% endif %}

        </span>

        <p>{{ thanks.content | markdownify }}</p>

        {% if thanks.years %}
          <span class="meta">Years at frontend: {{ thanks.years }}</span>
        {% endif %}

      </span>
    </li>
  {% endfor %}
</ul>
