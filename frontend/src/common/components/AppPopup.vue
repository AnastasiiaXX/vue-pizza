<script setup>
const emit = defineEmits(["close"]);
</script>
<template>
  <div class="popup">
    <a href="#" class="close" @click.prevent="emit('close')">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a href="#" class="button" @click.prevent="emit('close')">
        Отлично, я жду!
      </a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds-colors";
@import "@/assets/scss/ds-system/ds-shadows";
@import "@/assets/scss/mixins/m_center";

.popup {
  @include pf_center-all;

  z-index: 10;
  display: block;
  box-sizing: border-box;
  width: 420px;
  padding: 64px 95px;
  background-color: $white;
  box-shadow: $shadow-light;

  &::before,
  &::after {
    position: absolute;
    width: 48px;
    height: 48px;
    content: "";
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;
    background-image: url("@/assets/img/filling/ananas.svg");
  }

  &::after {
    right: 15px;
    bottom: 15px;
    background-image: url("@/assets/img/filling/tomatoes.svg");
  }

  p {
    margin-top: 24px;
    margin-bottom: 24px;
    text-align: center;
  }
}

.popup__title {
  text-align: center;
  font-size: 1.3em;
}

.popup__button {
  a {
    padding: 16px 32px;
  }
}

.close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;
  color: $black;
  border-radius: 50%;
  outline: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 25px;
    height: 2px;
    content: "";
    border-radius: 2px;
    background-color: $black;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {
    &::before,
    &::after {
      background-color: $orange-100;
    }
  }

  &--white {
    &::before,
    &::after {
      background-color: $white;
    }
  }
}
</style>
