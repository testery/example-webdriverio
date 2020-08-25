class AdminPage {
  get headingDashboard() { return $("h1=Dashboard"); }

  get linkManageCoursesAndContent() { return $("a[title='Manage Courses and Content']"); }
  get headingCourses() { return $("h1=Courses"); }

  get linkLearningObjects() { return $("a=Learning Objects"); }
  get headingLearningObjects() { return $("h1=Learning Objects"); }

  get linkAddNewFromWeb() { return $("a=Add New From Web"); }
  get headingCreateLearnLink() { return $("h1=Create Learn Link"); }

  // form: Add New From Web
  get dropdownEditTopic() { return $("select#edit-field-topic"); }
  get inputTitle() { return $("input#edit-title-0-value"); }
  get inputAltImgText() { return $("input[data-drupal-selector='edit-field-image-0-alt']"); }
  get inputDescription() { return $("textarea#edit-field-description-0-value"); }
  get inputTags() { return $("input#autocomplete-deluxe-input"); }
  get inputContentLink() { return $("input#edit-field-content-link-0-uri"); }
  get btnSave() { return $("input#edit-submit"); }

  get messageStatus() { return $("div[aria-label='Status message']"); }

  // tab: View
  get btnReadMore() { return $("a=Read more"); }
  get viewTitle() { return $("span=Test Title"); }
  get viewDescription() { return $("p=Test Description"); }
  get viewTag1() { return $("a*=test-tag1"); }
  get viewTag2() { return $("a*=test-tag2"); }
}

export default new AdminPage();
