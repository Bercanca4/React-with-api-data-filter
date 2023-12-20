import React from "react";

function footer() {
  return (
    <div>
      <footer class="bg-white rounded-lg shadowmb-0 dark:bg-gray-800">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a
                href="https://github.com/Bercanca4"
                class="hover:underline me-4 md:me-6">
                Github
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/becoderler"
                class="hover:underline me-4 md:me-6">
                Projeyi değerlendirip ulaşabilirsiniz.
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default footer;
