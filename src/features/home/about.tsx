import { component$ } from "@builder.io/qwik";

import ImgMe from "~/media/images/me.jpg?jsx";

export default component$(() => {
  return (
    <section
      id="about"
      class="full-width bg-zinc-950 px-5 py-20 text-zinc-300 md:px-16 md:py-60"
    >
      <div class="flex flex-col gap-8 md:gap-20 lg:flex-row">
        <ImgMe
          id="img-me"
          alt={$localize`An image of Abner Luis, a web developer from Brazil, creator of this website`}
          class="ml-0 mt-10 max-h-[600px] w-full grow overflow-hidden rounded-lg object-cover object-center"
        />
        <header class="my-auto flex max-w-full flex-col gap-4">
          <h2
            class="text-3xl font-medium leading-10 tracking-tighter text-zinc-200 sm:text-[3rem]"
            dangerouslySetInnerHTML={$localize`I believe in empowering <em class="font-serif italic">people</em>`}
          />
          <h3
            class="max-w-full text-xl leading-6 tracking-tight text-zinc-500 sm:leading-8"
            dangerouslySetInnerHTML={$localize`<span class="font-serif italic">People</span> are at the heart of any business. I develop software that brings <span class="font-serif italic">people</span> together and empowers them, all while bringing a smile to their faces.`}
          />
          <p class="mt-12 max-w-full text-base leading-6 tracking-normal text-gray-200">
            {$localize`I'm Abner 👋, an innovative and passionate Web Developer with a flair for creating elegant solutions in the
            least amount of time.`}
          </p>
          <p class="leading-6 tracking-normal text-gray-200">
            {$localize`With over 5 years of experience, I have crafted an array of dynamic and visually appealing web applications for diverse industries. Specialized in front-end development with extensive experience in creating high-impact, user-focused digital experiences.`}
          </p>
          <a
            href="mailto:abnerluis1001@gmail.com"
            target="_blank"
            rel="noreferrer"
            class="mt-12 max-w-full cursor-pointer whitespace-nowrap text-xl leading-8 tracking-tight text-zinc-500 underline md:text-2xl"
          >
            abnerluis1001@gmail.com
          </a>
        </header>
      </div>
    </section>
  );
});
