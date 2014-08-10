---
layout: home
customCSS: post-home.css
---

<article>

  <ul class="postings">
    {% for post in site.posts %}
        <li class="{% cycle 'even', 'odd' %}">
          <a href="{{ post.url }}">
            <span class="article-title">{{ post.title }}</span>
            <span class="article-date">{{ post.date | date: "%-m/%-d/%Y" }}</span>
          </a>
        </li>
    {% endfor %}
  </ul>

</article>
