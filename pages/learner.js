class LearnerPage {
  get linkPersonallyRecommended() { return $("a[title='View content personally recommended for you']"); }
  get linkRecentlyAdded() { return $("a[title='View recently added content']"); }

  get linkMe() { return $('a[title="Me"]'); }
  get linkMyBookmarks() { return $("a[title='My Bookmarks']"); }

  get btnBookmarks() { return $$("button.o-button--bookmark"); }
  get flagActive() { return $("div.o-flag.is-active"); }
}

export default new LearnerPage();
